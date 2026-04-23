package handler

import (
	"net/http"
	"strconv"

	"portofolio-backend/internal/domain"
	"portofolio-backend/pkg/response"

	"github.com/gin-gonic/gin"
)

type BlogHandler struct{ usecase domain.BlogUsecase }

func NewBlogHandler(u domain.BlogUsecase) *BlogHandler {
    return &BlogHandler{usecase: u}
}

func (h *BlogHandler) GetAll(c *gin.Context) {
    // Query param ?all=true untuk admin (lihat semua termasuk draft)
    onlyPublished := c.Query("all") != "true"
    data, err := h.usecase.GetAll(onlyPublished)
    if err != nil { response.Error(c, http.StatusInternalServerError, err.Error()); return }
    response.Success(c, http.StatusOK, "Berhasil", data)
}

func (h *BlogHandler) GetBySlug(c *gin.Context) {
    data, err := h.usecase.GetBySlug(c.Param("slug"))
    if err != nil { response.Error(c, http.StatusNotFound, "Blog tidak ditemukan"); return }
    response.Success(c, http.StatusOK, "Berhasil", data)
}

func (h *BlogHandler) GetByID(c *gin.Context) {
    id, _ := strconv.Atoi(c.Param("id"))
    data, err := h.usecase.GetByID(uint(id))
    if err != nil { response.Error(c, http.StatusNotFound, "Blog tidak ditemukan"); return }
    response.Success(c, http.StatusOK, "Berhasil", data)
}

func (h *BlogHandler) Create(c *gin.Context) {
    var b domain.Blog
    if err := c.ShouldBindJSON(&b); err != nil {
        response.Error(c, http.StatusBadRequest, err.Error()); return
    }
    if err := h.usecase.Create(&b); err != nil {
        response.Error(c, http.StatusBadRequest, err.Error()); return
    }
    response.Success(c, http.StatusCreated, "Blog berhasil dibuat", b)
}

func (h *BlogHandler) Update(c *gin.Context) {
    id, _ := strconv.Atoi(c.Param("id"))
    var b domain.Blog
    if err := c.ShouldBindJSON(&b); err != nil {
        response.Error(c, http.StatusBadRequest, err.Error()); return
    }
    b.ID = uint(id)
    if err := h.usecase.Update(&b); err != nil {
        response.Error(c, http.StatusBadRequest, err.Error()); return
    }
    response.Success(c, http.StatusOK, "Blog berhasil diupdate", b)
}

func (h *BlogHandler) Delete(c *gin.Context) {
    id, _ := strconv.Atoi(c.Param("id"))
    if err := h.usecase.Delete(uint(id)); err != nil {
        response.Error(c, http.StatusNotFound, err.Error()); return
    }
    response.Success(c, http.StatusOK, "Blog berhasil dihapus", nil)
}