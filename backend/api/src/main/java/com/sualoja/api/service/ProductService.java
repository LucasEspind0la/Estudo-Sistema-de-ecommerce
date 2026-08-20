package com.sualoja.api.service;

import com.sualoja.api.dto.request.CreateProductRequest;
import com.sualoja.api.dto.request.UpdateProductRequest;
import com.sualoja.api.dto.response.ProductResponse;
import com.sualoja.api.exception.ResourceNotFoundException;
import com.sualoja.api.model.entity.Category;
import com.sualoja.api.model.entity.Product;
import com.sualoja.api.model.entity.ProductVariant;
import com.sualoja.api.repository.CategoryRepository;
import com.sualoja.api.repository.ProductRepository;
import com.sualoja.api.repository.ProductVariantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductVariantRepository productVariantRepository;

    @Transactional
    public ProductResponse criar(CreateProductRequest requisicao) {
        Category categoria = categoryRepository.findById(requisicao.categoriaId())
            .orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada com o id: " + requisicao.categoriaId()));

        Product produto = Product.builder()
            .nome(requisicao.nome())
            .descricao(requisicao.descricao())
            .categoria(categoria)
            .ativo(requisicao.ativo())
            .destaque(requisicao.destaque())
            .build();

        Product produtoSalvo = productRepository.save(produto);

        if (requisicao.variantes() != null && !requisicao.variantes().isEmpty()) {
            for (var varianteReq : requisicao.variantes()) {
                if (productVariantRepository.existsBySku(varianteReq.sku())) {
                    throw new IllegalArgumentException("Já existe uma variação com este SKU: " + varianteReq.sku());
                }

                ProductVariant variante = ProductVariant.builder()
                    .produto(produtoSalvo)
                    .cor(varianteReq.cor())
                    .tamanho(varianteReq.tamanho())
                    .sku(varianteReq.sku())
                    .preco(varianteReq.preco())
                    .estoque(varianteReq.estoque())
                    .build();

                productVariantRepository.save(variante);
            }
        }

        return ProductResponse.deEntidade(productRepository.findById(produtoSalvo.getId()).get());
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> buscarTodos() {
        return productRepository.findAll()
            .stream()
            .map(ProductResponse::deEntidade)
            .toList();
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> buscarAtivos() {
        return productRepository.findByAtivoTrue()
            .stream()
            .map(ProductResponse::deEntidade)
            .toList();
    }

    @Transactional(readOnly = true)
    public ProductResponse buscarPorId(Long id) {
        Product produto = productRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado com o id: " + id));
        return ProductResponse.deEntidade(produto);
    }

    @Transactional
    public ProductResponse atualizar(Long id, UpdateProductRequest requisicao) {
        Product produto = productRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado com o id: " + id));

        if (requisicao.nome() != null) produto.setNome(requisicao.nome());
        if (requisicao.descricao() != null) produto.setDescricao(requisicao.descricao());
        if (requisicao.ativo() != null) produto.setAtivo(requisicao.ativo());
        if (requisicao.destaque() != null) produto.setDestaque(requisicao.destaque());

        if (requisicao.categoriaId() != null) {
            Category categoria = categoryRepository.findById(requisicao.categoriaId())
                .orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada com o id: " + requisicao.categoriaId()));
            produto.setCategoria(categoria);
        }

        return ProductResponse.deEntidade(productRepository.save(produto));
    }

    @Transactional
    public ProductResponse alternarStatusAtivo(Long id) {
        Product produto = productRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado com o id: " + id));
        produto.setAtivo(!produto.getAtivo());
        return ProductResponse.deEntidade(productRepository.save(produto));
    }

    @Transactional
    public void deletar(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Produto não encontrado com o id: " + id);
        }
        productRepository.deleteById(id);
    }
}