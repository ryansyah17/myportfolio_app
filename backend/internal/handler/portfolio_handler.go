package handler

import (
	"net/http"
	"strconv"

	"portofolio-backend/internal/domain"
	"portofolio-backend/pkg/response"

	"github.com/gin-gonic/gin"
)

type PortfolioHandler struct {
    usecase domain.PortfolioUsecase
}

func NewPortfolioHandler(usecase domain.PortfolioUsecase) *PortfolioHandler {
    return &PortfolioHandler{usecase: usecase}
}

// GetAll → GET /api/portfolios
func (h *PortfolioHandler) GetAll(c *gin.Context) {
    portfolios, err := h.usecase.GetAll()
    if err != nil {
        response.Error(c, http.StatusInternalServerError, "Gagal mengambil data portfolio")
        return
    }
    response.Success(c, http.StatusOK, "Berhasil", portfolios)
}

// GetByID → GET /api/portfolios/:id
func (h *PortfolioHandler) GetByID(c *gin.Context) {
    id, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        response.Error(c, http.StatusBadRequest, "ID tidak valid")
        return
    }

    portfolio, err := h.usecase.GetByID(uint(id))
    if err != nil {
        response.Error(c, http.StatusNotFound, "Portfolio tidak ditemukan")
        return
    }
    response.Success(c, http.StatusOK, "Berhasil", portfolio)
}

// Create → POST /api/portfolios
func (h *PortfolioHandler) Create(c *gin.Context) {
    var portfolio domain.Portfolio
    if err := c.ShouldBindJSON(&portfolio); err != nil {
        response.Error(c, http.StatusBadRequest, "Data tidak valid: "+err.Error())
        return
    }

    if err := h.usecase.Create(&portfolio); err != nil {
        response.Error(c, http.StatusBadRequest, err.Error())
        return
    }
    response.Success(c, http.StatusCreated, "Portfolio berhasil dibuat", portfolio)
}

// Update → PUT /api/portfolios/:id
func (h *PortfolioHandler) Update(c *gin.Context) {
    id, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        response.Error(c, http.StatusBadRequest, "ID tidak valid")
        return
    }

    var portfolio domain.Portfolio
    if err := c.ShouldBindJSON(&portfolio); err != nil {
        response.Error(c, http.StatusBadRequest, "Data tidak valid")
        return
    }

    portfolio.ID = uint(id)
    if err := h.usecase.Update(&portfolio); err != nil {
        response.Error(c, http.StatusBadRequest, err.Error())
        return
    }
    response.Success(c, http.StatusOK, "Portfolio berhasil diupdate", portfolio)
}

// Delete → DELETE /api/portfolios/:id
func (h *PortfolioHandler) Delete(c *gin.Context) {
    id, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        response.Error(c, http.StatusBadRequest, "ID tidak valid")
        return
    }

    if err := h.usecase.Delete(uint(id)); err != nil {
        response.Error(c, http.StatusNotFound, err.Error())
        return
    }
    response.Success(c, http.StatusOK, "Portfolio berhasil dihapus", nil)
}