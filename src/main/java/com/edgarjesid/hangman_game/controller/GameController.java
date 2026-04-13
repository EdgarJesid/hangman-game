package com.edgarjesid.hangman_game.controller;

import com.edgarjesid.hangman_game.model.GameState;
import com.edgarjesid.hangman_game.service.GameService;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping("/api/game/{roomId}/create")
    @ResponseBody
    public GameState createGame(@PathVariable String roomId) {
        return gameService.createGame(roomId);
    }

    @GetMapping("/api/game/{roomId}")
    @ResponseBody
    public GameState getGame(@PathVariable String roomId) {
        return gameService.getGame(roomId);
    }

    @MessageMapping("/game/{roomId}/guess")
    @SendTo("/topic/game/{roomId}")
    public GameState guess(@DestinationVariable String roomId, String letter) {
        return gameService.processGuess(roomId, letter.charAt(0));
    }
}