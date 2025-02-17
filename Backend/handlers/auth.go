package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/2231rt1/MyWebSite/Backend/models"
	"github.com/2231rt1/MyWebSite/Backend/repository"
)

var userRepo *repository.UserRepository

// InitAuthHandlers инициализирует обработчики аутентификации, передавая репозиторий.
func InitAuthHandlers(repo *repository.UserRepository) {
	userRepo = repo
}

// RegisterUser обрабатывает регистрацию пользователя.
func RegisterUser(w http.ResponseWriter, r *http.Request) {
	var user models.User
	// Декодирование JSON из тела запроса
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Здесь можно добавить валидацию данных и хеширование пароля

	result, err := userRepo.CreateUser(r.Context(), user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}
