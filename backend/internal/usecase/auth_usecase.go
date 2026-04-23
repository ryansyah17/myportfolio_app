package usecase

import (
	"errors"

	"portofolio-backend/internal/domain"
	"portofolio-backend/pkg/jwt"

	"golang.org/x/crypto/bcrypt"
)

type authUsecase struct {
    userRepo domain.UserRepository
}

func NewAuthUsecase(userRepo domain.UserRepository) domain.AuthUsecase {
    return &authUsecase{userRepo: userRepo}
}

func (u *authUsecase) Login(req *domain.LoginRequest) (*domain.AuthResponse, error) {
    // 1. Cari user by email
    user, err := u.userRepo.FindByEmail(req.Email)
    if err != nil {
        return nil, errors.New("email atau password salah")
    }

    // 2. Bandingkan password dengan hash di database
    err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password))
    if err != nil {
        return nil, errors.New("email atau password salah")
    }

    // 3. Generate JWT token
    token, err := jwt.GenerateToken(user.ID, user.Email, user.Role)
    if err != nil {
        return nil, errors.New("gagal membuat token")
    }

    return &domain.AuthResponse{Token: token, User: *user}, nil
}

func (u *authUsecase) Register(req *domain.RegisterRequest) (*domain.AuthResponse, error) {
    // 1. Cek apakah email sudah terdaftar
    _, err := u.userRepo.FindByEmail(req.Email)
    if err == nil {
        return nil, errors.New("email sudah terdaftar")
    }

    // 2. Hash password sebelum disimpan — JANGAN simpan plain text!
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
    if err != nil {
        return nil, errors.New("gagal memproses password")
    }

    // 3. Simpan user baru
    user := &domain.User{
        Name:     req.Name,
        Email:    req.Email,
        Password: string(hashedPassword),
        Role:     "admin",
    }

    if err := u.userRepo.Create(user); err != nil {
        return nil, errors.New("gagal membuat akun")
    }

    // 4. Generate token untuk langsung login setelah register
    token, err := jwt.GenerateToken(user.ID, user.Email, user.Role)
    if err != nil {
        return nil, errors.New("gagal membuat token")
    }

    return &domain.AuthResponse{Token: token, User: *user}, nil
}