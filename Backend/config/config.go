package config

import (
	"context"
	"os"
	"time"

	"github.com/joho/godotenv"
)

// LoadEnv загружает переменные окружения из .env
func LoadEnv() {
    _ = godotenv.Load()
}

// GetMongoURI возвращает строку подключения к MongoDB из переменной окружения
func GetMongoURI() string {
    uri := os.Getenv("MONGO_URI")
    if uri == "" {
        uri = "mongodb://localhost:27017" // По умолчанию
    }
    return uri
}

// GetContext возвращает контекст с заданным таймаутом
func GetContext(timeout time.Duration) (context.Context, context.CancelFunc) {
    return context.WithTimeout(context.Background(), timeout)
}
