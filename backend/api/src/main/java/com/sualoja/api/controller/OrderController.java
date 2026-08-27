package com.sualoja.api.controller;

import com.sualoja.api.dto.response.OrderResponse;
import com.sualoja.api.model.entity.User;
import com.sualoja.api.model.enums.OrderStatus;
import com.sualoja.api.service.OrderService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@RequiredArgsConstructor
@Tag(name = "Pedidos", description = "Endpoints para gerenciamento de pedidos")
public class OrderController {

    private final OrderService orderService;

    // Finaliza o pedido (checkout)
    @PostMapping("/finalizar")
    public ResponseEntity<OrderResponse> finalizarPedido(@AuthenticationPrincipal User usuario) {
        return ResponseEntity.ok(orderService.finalizarPedido(usuario.getId()));
    }

    // Lista os pedidos do usuário autenticado
    @GetMapping("/meus-pedidos")
    public ResponseEntity<List<OrderResponse>> buscarMeusPedidos(@AuthenticationPrincipal User usuario) {
        return ResponseEntity.ok(orderService.buscarPedidosPorUsuario(usuario.getId()));
    }

    // Busca um pedido específico por ID
    @GetMapping("/{pedidoId}")
    public ResponseEntity<OrderResponse> buscarPedidoPorId(@PathVariable Long pedidoId) {
        return ResponseEntity.ok(orderService.buscarPedidoPorId(pedidoId));
    }

    // Atualiza o status do pedido (apenas ADMIN)
    @PatchMapping("/{pedidoId}/status")
    public ResponseEntity<OrderResponse> atualizarStatus(
        @PathVariable Long pedidoId,
        @RequestParam OrderStatus status
    ) {
        return ResponseEntity.ok(orderService.atualizarStatusPedido(pedidoId, status));
    }
}