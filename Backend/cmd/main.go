package main

import (
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/2231rt1/MyWebSite/Backend/config"
	"github.com/2231rt1/MyWebSite/Backend/handlers"
	"github.com/2231rt1/MyWebSite/Backend/repository"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	// Загружаем переменные окружения из файла .env
	config.LoadEnv()

	// Получаем URI подключения к MongoDB
	uri := config.GetMongoURI()
	clientOpts := options.Client().ApplyURI(uri)
	ctx, cancel := config.GetContext(10 * time.Second)
	defer cancel()

	// Подключаемся к MongoDB
	client, err := mongo.Connect(ctx, clientOpts)
	if err != nil {
		log.Fatal(err)
	}

	if err = client.Ping(ctx, nil); err != nil {
		log.Fatal("Не удалось подключиться к MongoDB:", err)
	}
	log.Println("Успешное подключение к MongoDB!")

	// Инициализация базы данных, репозитория и обработчиков
	db := client.Database("mydatabase")
	userRepo := repository.NewUserRepository(db)
	handlers.InitAuthHandlers(userRepo)

	// Настраиваем маршруты с использованием Gorilla Mux
	r := mux.NewRouter()
	r.HandleFunc("/api/register", handlers.RegisterUser).Methods("POST")
	// При необходимости добавьте другие маршруты, например, для входа

	log.Println("Сервер запущен на порту 8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}
