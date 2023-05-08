package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

type User struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

func getUser(w http.ResponseWriter, r *http.Request) {
	userID := r.URL.Query().Get("id")
	user := User{
		ID:          userID,
		Name:        "Noppakorn Kaewsalabnil",
		Description: "Full Stack Developer specializing in Golang, React, Typescript, and SCSS.",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	allowdOrigins, ok := os.LookupEnv("ALLOWED_ORIGINS")
	if !ok {
		log.Fatal("ALLOWED_ORIGINS is not set in .env file")
	}

	port, ok := os.LookupEnv("PORT")
	if !ok {
		log.Fatal("PORT is not set in .env file")
	}

	r := mux.NewRouter()

	r.HandleFunc("/api/user", getUser).Methods("GET")

	corsOptions := cors.New(cors.Options{
		AllowedOrigins: []string{allowdOrigins},
		AllowedMethods: []string{"GET"},
		AllowedHeaders: []string{"Content-Type"},
	})

	handler := corsOptions.Handler(r)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}
