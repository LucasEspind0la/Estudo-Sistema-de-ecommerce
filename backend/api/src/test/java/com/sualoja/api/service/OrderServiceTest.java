package com.sualoja.api.service;

import com.sualoja.api.model.entity.*;
import com.sualoja.api.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock private OrderRepository orderRepository;
    @Mock private CartRepository cartRepository;
    @Mock private UserRepository userRepository;
    @Mock private ProductVariantRepository productVariantRepository;

    @InjectMocks
    private OrderService orderService;

    private User usuario;
    private Cart carrinho;
    private ProductVariant variante;
    private CartItem itemCarrinho;

        @BeforeEach
    void setUp() {
        usuario = User.builder().id(1L).email("teste@loja.com").build();
        
        // Cria um produto fictício para a variante
        Product produto = Product.builder().id(1L).nome("Produto Teste").build();

        variante = ProductVariant.builder()
            .id(1L)
            .produto(produto) // <-- ADICIONE ESTA LINHA
            .estoque(5) 
            .preco(new BigDecimal("100.00"))
            .build();

        itemCarrinho = CartItem.builder()
            .id(1L)
            .varianteProduto(variante)
            .quantidade(10)
            .build();

        carrinho = Cart.builder()
            .id(1L)
            .usuario(usuario)
            .itens(List.of(itemCarrinho))
            .build();
    }

     @Test
    void deveLancarExcecaoAoFinalizarPedidoComEstoqueInsuficiente() {
        // Arrange: Configurar o comportamento dos Mocks
        when(cartRepository.findByUsuarioId(1L)).thenReturn(Optional.of(carrinho));
        when(userRepository.findById(1L)).thenReturn(Optional.of(usuario));
        // Removemos a linha do productVariantRepository.findById pois a variante já está no item

        // Act & Assert: Esperamos que uma exceção seja lançada
        IllegalArgumentException excecao = assertThrows(
            IllegalArgumentException.class,
            () -> orderService.finalizarPedido(1L)
        );

        assertTrue(excecao.getMessage().contains("Estoque insuficiente"));
        verify(orderRepository, never()).save(any(Order.class));
    }
}