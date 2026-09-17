package com.sualoja.api.service;

import com.sualoja.api.dto.response.OrderResponse;
import com.sualoja.api.model.entity.Cart;
import com.sualoja.api.model.entity.CartItem;
import com.sualoja.api.model.entity.Order;
import com.sualoja.api.model.entity.Product;
import com.sualoja.api.model.entity.ProductVariant;
import com.sualoja.api.model.entity.User;
import com.sualoja.api.repository.CartRepository;
import com.sualoja.api.repository.OrderRepository;
import com.sualoja.api.repository.ProductVariantRepository;
import com.sualoja.api.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT) // <-- CORREÇÃO 1: Evita erro de UnnecessaryStubbing
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private ProductVariantRepository variantRepository;

    @Mock
    private CartRepository cartRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private OrderService orderService;

    private User usuario;
    private ProductVariant variante;
    private Cart cart;
    private CartItem cartItem;

    @BeforeEach
    void setUp() {
        usuario = new User();
        usuario.setId(1L);
        usuario.setEmail("lucas@teste.com");

        variante = new ProductVariant();
        variante.setId(1L);
        variante.setEstoque(10);
        variante.setPreco(BigDecimal.valueOf(100.00));
        
        Product produto = new Product();
        produto.setNome("Camiseta Teste");
        variante.setProduto(produto);

        cart = new Cart();
        cart.setId(1L);
        cart.setUsuario(usuario);

        cartItem = new CartItem();
        cartItem.setId(1L);
        cartItem.setVarianteProduto(variante); // Nome correto do setter
        cartItem.setQuantidade(1);
        
        List<CartItem> itens = new ArrayList<>();
        itens.add(cartItem);
        cart.setItens(itens);
    }

    @Test
    @DisplayName("Deve finalizar pedido com sucesso quando há estoque")
    void deveFinalizarPedidoComSucesso() {
        // Arrange
        when(userRepository.findById(usuario.getId())).thenReturn(Optional.of(usuario));
        when(cartRepository.findByUsuarioId(usuario.getId())).thenReturn(Optional.of(cart));
        when(variantRepository.findById(variante.getId())).thenReturn(Optional.of(variante));
        when(orderRepository.save(any(Order.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        OrderResponse response = orderService.finalizarPedido(usuario.getId());

        // Assert
        assertNotNull(response);
        
        // CORREÇÃO 2: O DTO retorna String, não o Enum OrderStatus
        assertEquals("PENDENTE", response.status()); 
        
        verify(userRepository, times(1)).findById(usuario.getId());
        verify(cartRepository, times(1)).findByUsuarioId(usuario.getId());
        verify(orderRepository, times(1)).save(any(Order.class));
    }

    @Test
    @DisplayName("Deve lançar exceção quando o estoque for insuficiente")
    void deveLancarExcecaoQuandoEstoqueInsuficiente() {
        // Arrange: Força o cenário de erro (estoque 0)
        variante.setEstoque(0); 
        
        // Usando lenient() pois a exceção pode ser lançada antes de chamar todos os métodos
        lenient().when(userRepository.findById(usuario.getId())).thenReturn(Optional.of(usuario));
        lenient().when(cartRepository.findByUsuarioId(usuario.getId())).thenReturn(Optional.of(cart));
        lenient().when(variantRepository.findById(variante.getId())).thenReturn(Optional.of(variante));

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            orderService.finalizarPedido(usuario.getId());
        });

        assertTrue(exception.getMessage().toLowerCase().contains("estoque"), 
            "A mensagem de erro deveria mencionar 'estoque', mas foi: " + exception.getMessage());
            
        verify(orderRepository, never()).save(any(Order.class)); 
    }
}