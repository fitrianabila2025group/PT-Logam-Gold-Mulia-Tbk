package config

import "os"

type Config struct {
	Port        string
	AppEnv      string
	BaseURL     string
	ContactEmail string
}

func Load() *Config {
	return &Config{
		Port:        getEnv("PORT", "3000"),
		AppEnv:      getEnv("APP_ENV", "development"),
		BaseURL:     getEnv("BASE_URL", "https://logam.gold"),
		ContactEmail: getEnv("CONTACT_EMAIL", "info@logam.gold"),
	}
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
