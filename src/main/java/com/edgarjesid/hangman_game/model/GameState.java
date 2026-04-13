package com.edgarjesid.hangman_game.model;

import java.util.HashSet;
import java.util.Set;

public class GameState {

    private String word;
    private Set<Character> guessedLetters = new HashSet<>();
    private int maxAttempts = 6;
    private String status = "waiting";

    public boolean guess(char letter){
        guessedLetters.add(letter);
        return word.indexOf(letter) >= 0;
    }

    public boolean  isWordGuessed(){
        for(char c: word.toCharArray()) {
        if (!guessedLetters.contains(c)) return false;
        }
        return true;
    }

    public int getRemainingAttemps(){
        long wrong = guessedLetters.stream()
                .filter(c -> word.indexOf(c) < 0)
                .count();
        return maxAttempts - (int) wrong;
    }

    public String getMaskedWord() {
        StringBuilder sb = new StringBuilder();
        for (char c : word.toCharArray()) {
            sb.append(guessedLetters.contains(c) ? c : '_');
            sb.append(' ');
        }
        return sb.toString().trim();
    }

    public int getRemainingAttempts() {
        long wrong = guessedLetters.stream()
                .filter(c -> word.indexOf(c) < 0)
                .count();
        return maxAttempts - (int) wrong;
    }

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public Set<Character> getGuessedLetters() {
        return guessedLetters;
    }

    public void setGuessedLetters(Set<Character> guessedLetters) {
        this.guessedLetters = guessedLetters;
    }

    public int getMaxAttempts() {
        return maxAttempts;
    }

    public void setMaxAttempts(int maxAttempts) {
        this.maxAttempts = maxAttempts;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
