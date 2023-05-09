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
	ID     string `json:"id"`
	Name   string `json:"name"`
	Email  string `json:"email"`
	Bio    string `json:"bio"`
	Avatar string `json:"avatar"`
}

func getUser(w http.ResponseWriter, r *http.Request) {
	userID := r.URL.Query().Get("id")
	user := User{
		ID:     userID,
		Name:   "Noppakorn Kaewsalabnil",
		Email:  "portal@gmail.com",
		Bio:    "I am currently studying computer science at KMITL in Thailand, and my interests revolve around DevOps, Cybersecurity, and Web Development.",
		Avatar: "https://avatars.githubusercontent.com/u/108584943?v=4",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

func main() {
	isDocker, ok := os.LookupEnv("DOCKER_ENV")
	if !ok {
		log.Fatal("DOCKER_ENV cannot be found")
	}
	if isDocker != "true" {
		if err := godotenv.Load(); err != nil {
			log.Fatal("Error loading .env file")
		}
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
