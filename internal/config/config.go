package config

import "os"

type Config struct {
	Port         string
	AppEnv       string
	BaseURL      string
	ContactEmail string
	SMTPHost     string
	SMTPPort     string
	SMTPUser     string
	SMTPPass     string
}

func Load() *Config {
	return &Config{
		Port:         getEnv("PORT", "3000"),
		AppEnv:       getEnv("APP_ENV", "development"),
		BaseURL:      getEnv("BASE_URL", "https://logam.gold"),
		ContactEmail: getEnv("CONTACT_EMAIL", "wiliamjones@pm.me"),
		SMTPHost:     getEnv("SMTP_HOST", ""),
		SMTPPort:     getEnv("SMTP_PORT", "587"),
		SMTPUser:     getEnv("SMTP_USER", ""),
		SMTPPass:     getEnv("SMTP_PASS", ""),
	}
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
