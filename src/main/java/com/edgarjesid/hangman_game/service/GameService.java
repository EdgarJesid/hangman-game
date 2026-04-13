package com.edgarjesid.hangman_game.service;

import com.edgarjesid.hangman_game.model.GameState;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
public class GameService {

    private final List<String> words = Arrays.asList(
        "manzana", "zanahoria", "computador", "programacion",
        "mariposa", "helicoptero", "chocolatina", "universo",
        "fotografia", "bicicleta", "restaurante", "biblioteca"
    );

    private final Map<String, GameState> games = new HashMap<>();

    public GameState createGame(String roomId){
        GameState game = new GameState();
        game.setWord(words.get(new Random().nextInt(words.size())));
        game.setStatus("playing");
        games.put(roomId, game);
        return game;

    }

    public GameState getGame(String roomId){
        return games.get(roomId);
    }

    public GameState processGuess(String roomId, char letter){
        GameState game = games.get(roomId);
        if (game == null || !game.getStatus().equals("playing")) return game;

        game.guess(letter);

        if(game.isWordGuessed()) {
            game.setStatus("won");
        }else if (game.getRemainingAttemps() <= 0){
            game.setStatus("lost");
        }
        return game;
    }
}
