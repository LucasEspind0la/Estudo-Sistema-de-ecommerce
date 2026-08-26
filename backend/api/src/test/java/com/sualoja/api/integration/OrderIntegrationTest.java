package com.sualoja.api.integration;

import com.sualoja.api.model.entity.*;
import com.sualoja.api.model.enums.UserRole;
import com.sualoja.api.repository.*;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class OrderIntegrationTest {

    @Autowired private MockMvc mockMvc;
    
    @Autowired private UserRepository userRepository;
    @Autowired private CategoryRepository categoryRepository;
    @Autowired private ProductRepository productRepository;
    @Autowired private ProductVariantRepository productVariantRepository;
    @Autowired private CartRepository cartRepository;
    @Autowired private OrderRepository orderRepository;

    private User usuario;
    private ProductVariant variante;

    @BeforeEach
    void setUp() {
        // 1. Criar e salvar o usuário
        usuario = userRepository.save(User.builder()
            .nome("Cliente Teste")
            .email("cliente@teste.com")
            .senha("123")
            .papel(UserRole.CLIENTE)
            .build());

        // 2. Criar e salvar uma categoria
        Category categoria = categoryRepository.save(Category.builder()
            .nome("Categoria Teste")
            .descricao("Categoria para testes de integração")
            .build());

        // 3. Criar e salvar o produto
        Product produto = productRepository.save(Product.builder()
            .nome("Produto Teste")
            .descricao("Descrição do produto de teste")
            .categoria(categoria)
            .ativo(true)
            .destaque(false)
            .build());

        // 4. Criar e salvar a variante VINCULADA ao produto
        variante = productVariantRepository.save(ProductVariant.builder()
            .produto(produto)
            .cor("Preto")
            .tamanho("40")
            .sku("TESTE-01")
            .preco(new BigDecimal("50.00"))
            .estoque(10)
            .build());

        // 5. Criar o item do carrinho (ainda sem o carrinho definido)
        CartItem item = CartItem.builder()
            .varianteProduto(variante)
            .quantidade(2)
            .build();

        // 6. Criar o carrinho com o item na lista (CascadeType.ALL salvará o item automaticamente)
        Cart carrinho = Cart.builder()
            .usuario(usuario)
            .itens(new ArrayList<>(List.of(item)))
            .build();
        
        // 7. Manter a consistência bidirecional (obrigatório no JPA)
        item.setCarrinho(carrinho);

        // 8. Salvar o carrinho (isso salva o item também no banco)
        cartRepository.save(carrinho);

        // 9. Configurar o SecurityContext com o usuário criado para o @AuthenticationPrincipal funcionar
        UsernamePasswordAuthenticationToken authentication = 
            new UsernamePasswordAuthenticationToken(usuario, null, usuario.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    @AfterEach
    void tearDown() {
        // Limpar o SecurityContext após cada teste para não interferir nos próximos
        SecurityContextHolder.clearContext();
    }

    @Test
    void deveFinalizarPedidoEBaixarEstoqueComSucesso() throws Exception {
        // Act: Simula a requisição POST para finalizar o pedido
        mockMvc.perform(post("/api/pedidos/finalizar")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        // Assert 1: Verifica se o pedido foi criado no banco
        assertEquals(1, orderRepository.count());
        
        // Assert 2: Verifica se o estoque foi realmente baixado de 10 para 8
        ProductVariant varianteAtualizada = productVariantRepository.findById(variante.getId()).orElseThrow();
        assertEquals(8, varianteAtualizada.getEstoque());
    }
}