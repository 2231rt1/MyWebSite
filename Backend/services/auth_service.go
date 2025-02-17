package services

import (
	"errors"

	"github.com/2231rt1/MyWebSite/Backend/models"
	"github.com/2231rt1/MyWebSite/Backend/repository"
	"golang.org/x/crypto/bcrypt"
)

// AuthService отвечает за бизнес-логику аутентификации.
type AuthService struct {
	UserRepo *repository.UserRepository
}

// RegisterUser выполняет регистрацию пользователя.
func (s *AuthService) RegisterUser(user models.User) error {
	// Пример валидации
	if user.Email == "" || user.Password == "" {
		return errors.New("email и пароль обязательны")
	}

	// Хеширование пароля
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.Password = string(hashedPassword)

	_, err = s.UserRepo.CreateUser(nil, user) // Передавайте контекст при необходимости
	return err
}
