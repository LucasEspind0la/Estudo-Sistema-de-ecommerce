package com.sualoja.api.config;

import com.sualoja.api.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Desativa CSRF, pois APIs REST com JWT não usam cookies de sessão
            .csrf(csrf -> csrf.disable())
            
            // Define que a API é "STATELESS" (sem estado). Não cria sessões no servidor, confia apenas no Token
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            
            // Define as regras de quem pode acessar o quê (O "Porteiro")
           .authorizeHttpRequests(auth -> auth
            // Rotas públicas
            .requestMatchers("/api/auth/**").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/produtos/**").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/categorias/**").permitAll()

            // Permitir acesso público às imagens dos produtos
            .requestMatchers("/uploads/**").permitAll()

            // Liberar acesso público à documentação Swagger
            .requestMatchers("/v3/api-docs/**").permitAll()
            .requestMatchers("/swagger-ui/**").permitAll()
            .requestMatchers("/swagger-ui.html").permitAll()
    
           // Rotas protegidas (só ADMIN)
            .requestMatchers(HttpMethod.POST, "/api/produtos/**").hasRole("ADMINISTRADOR")
            .requestMatchers(HttpMethod.PUT, "/api/produtos/**").hasRole("ADMINISTRADOR")
            .requestMatchers(HttpMethod.PATCH, "/api/produtos/**").hasRole("ADMINISTRADOR")
            .requestMatchers(HttpMethod.DELETE, "/api/produtos/**").hasRole("ADMINISTRADOR")
            .requestMatchers(HttpMethod.POST, "/api/categorias/**").hasRole("ADMINISTRADOR")
            .requestMatchers(HttpMethod.PUT, "/api/categorias/**").hasRole("ADMINISTRADOR")
            .requestMatchers(HttpMethod.DELETE, "/api/categorias/**").hasRole("ADMINISTRADOR")
    
            // NOVAS ROTAS: Carrinho e Pedidos
            .requestMatchers("/api/carrinho/**").authenticated()
            .requestMatchers("/api/pedidos/meus-pedidos").authenticated()
            .requestMatchers("/api/pedidos/finalizar").authenticated()
            .requestMatchers("/api/pedidos/**").hasRole("ADMINISTRADOR")
    
    // Qualquer outra rota exige autenticação
    .anyRequest().authenticated()
    )
            // Adiciona o nosso filtro JWT ANTES do filtro padrão de senha do Spring
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
            
        return http.build();
    }

    // Expõe o gerenciador de autenticação para o AuthService usar no login
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    // Define que o algoritmo de criptografia de senha será o BCrypt
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}