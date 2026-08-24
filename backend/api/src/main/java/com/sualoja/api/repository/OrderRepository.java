package com.sualoja.api.repository;

import com.sualoja.api.model.entity.Order;
import com.sualoja.api.model.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    // Lista todos os pedidos de um cliente específico (ordenados do mais recente)
    List<Order> findByUsuarioIdOrderByCriadoEmDesc(Long usuarioId);
    // Lista pedidos por status (útil para o admin ver pedidos pendentes, etc)
    List<Order> findByStatus(OrderStatus status);
}