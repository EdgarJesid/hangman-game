# Ahorcado Multijugador 🎮

Juego de ahorcado cooperativo en tiempo real construido con Java y Spring Boot.

## ¿Cómo funciona?

Dos jugadores se unen a una sala con el mismo código y juegan juntos adivinando
la palabra letra por letra. Las actualizaciones se ven en tiempo real sin recargar
la página gracias a WebSockets.

El modo cooperativo fue elegido intencionalmente — los dos jugadores trabajan
juntos contra el servidor, que elige una palabra aleatoria en español.

## Tech Stack

- Java 21
- Spring Boot 3.5
- WebSockets (STOMP)
- HTML + CSS + JavaScript

## Características

- Salas de juego con código personalizado
- Comunicación en tiempo real entre jugadores
- Teclado interactivo en pantalla
- Dibujo del ahorcado progresivo
- Alertas de victoria y derrota

## Cómo correrlo

1. Clona el repositorio
2. Abre con IntelliJ IDEA
3. Ejecuta `HangmanGameApplication.java`
4. Abre `http://localhost:8080` en el navegador
5. Comparte el código de sala con otro jugador

## Modo cooperativo

A diferencia del ahorcado tradicional donde un jugador elige la palabra y otro
adivina, este juego es cooperativo — ambos jugadores adivinan juntos la misma
palabra elegida aleatoriamente por el servidor. Esto permite que el juego
comience inmediatamente sin necesidad de turnos de configuración.