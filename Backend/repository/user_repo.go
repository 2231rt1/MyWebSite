package repository

import (
	"context"
	"time"

	"github.com/2231rt1/MyWebSite/Backend/models"
	"go.mongodb.org/mongo-driver/mongo"
)

// UserRepository предоставляет методы для работы с коллекцией пользователей.
type UserRepository struct {
	Collection *mongo.Collection
}

// NewUserRepository создаёт новый репозиторий пользователей.
func NewUserRepository(db *mongo.Database) *UserRepository {
	return &UserRepository{
		Collection: db.Collection("users"),
	}
}

// CreateUser добавляет нового пользователя в коллекцию.
func (r *UserRepository) CreateUser(ctx context.Context, user models.User) (*mongo.InsertOneResult, error) {
	ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()
	return r.Collection.InsertOne(ctx, user)
}
