# PT Logam Gold Mulia Tbk — Company Profile Website

Website profil perusahaan **PT Logam Gold Mulia Tbk** yang dibangun dengan Go (Fiber), server-side rendering, dan Tailwind CSS.

**Domain:** [logam.gold](https://logam.gold)

---

## Tech Stack

- **Backend:** Go 1.22+ dengan [Fiber](https://gofiber.io/) v2
- **Templating:** Go HTML Templates (server-side rendered)
- **Styling:** Tailwind CSS (CDN) + Custom CSS
- **JavaScript:** Vanilla JS (minimal, progressive enhancement)
- **Deployment:** Docker-ready, VPS-compatible

## Struktur Proyek

```
.
├── cmd/
│   └── server/
│       └── main.go              # Entry point aplikasi
├── internal/
│   ├── config/
│   │   └── config.go            # Konfigurasi environment
│   ├── handler/
│   │   └── handler.go           # HTTP handlers & template engine
│   └── middleware/
│       └── security.go          # Security middleware
├── templates/
│   ├── layouts/
│   │   └── base.html            # Layout utama
│   ├── partials/
│   │   ├── header.html          # Header & navigasi
│   │   └── footer.html          # Footer & CTA banner
│   ├── pages/
│   │   ├── home.html            # Beranda
│   │   ├── tentang.html         # Tentang Perusahaan
│   │   ├── layanan.html         # Layanan & Bisnis
│   │   ├── komitmen.html        # Komitmen Kami
│   │   ├── tata-kelola.html     # Tata Kelola (GCG)
│   │   ├── berita.html          # Berita & Wawasan
│   │   ├── faq.html             # FAQ
│   │   └── kontak.html          # Hubungi Kami
│   └── errors/
│       ├── 404.html             # Halaman tidak ditemukan
│       └── 500.html             # Kesalahan server
├── static/
│   ├── css/
│   │   └── style.css            # Custom styles
│   ├── js/
│   │   └── main.js              # Client-side interactions
│   ├── favicon.svg              # Favicon
│   ├── robots.txt               # Robots.txt
│   └── sitemap.xml              # Sitemap XML
├── .env.example                 # Contoh konfigurasi environment
├── .gitignore
├── Dockerfile                   # Docker build config
├── go.mod
├── go.sum
└── README.md
```

## Setup & Development

### Prerequisites

- Go 1.22 atau lebih baru
- Git

### Clone & Run

```bash
# Clone repository
git clone https://github.com/your-org/PT-Logam-Gold-Mulia-Tbk.git
cd PT-Logam-Gold-Mulia-Tbk

# Download dependencies
go mod download

# Copy environment config
cp .env.example .env

# Run development server
go run ./cmd/server

# Website tersedia di http://localhost:3000
```

### Environment Variables

| Variable | Default | Deskripsi |
|----------|---------|-----------|
| `PORT` | `3000` | Port server |
| `APP_ENV` | `development` | Environment (`development` / `production`) |
| `BASE_URL` | `https://logam.gold` | Base URL untuk SEO canonical |
| `CONTACT_EMAIL` | `info@logam.gold` | Email kontak |

## Build for Production

### Binary Build

```bash
# Build binary
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o server ./cmd/server

# Run
./server
```

### Docker Build

```bash
# Build image
docker build -t logam-gold .

# Run container
docker run -d -p 3000:3000 --name logam-gold \
  -e PORT=3000 \
  -e APP_ENV=production \
  -e BASE_URL=https://logam.gold \
  logam-gold
```

## Deployment

### VPS (Ubuntu/Debian)

1. Build binary untuk Linux:
   ```bash
   CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o server ./cmd/server
   ```

2. Upload ke server:
   ```bash
   scp -r server templates/ static/ .env user@server:/opt/logam-gold/
   ```

3. Buat systemd service (`/etc/systemd/system/logam-gold.service`):
   ```ini
   [Unit]
   Description=Logam Gold Website
   After=network.target

   [Service]
   Type=simple
   User=www-data
   WorkingDirectory=/opt/logam-gold
   ExecStart=/opt/logam-gold/server
   EnvironmentFile=/opt/logam-gold/.env
   Restart=always
   RestartSec=5

   [Install]
   WantedBy=multi-user.target
   ```

4. Enable and start:
   ```bash
   sudo systemctl enable logam-gold
   sudo systemctl start logam-gold
   ```

5. Configure Nginx reverse proxy:
   ```nginx
   server {
       listen 80;
       server_name logam.gold;

       location / {
           proxy_pass http://127.0.0.1:3000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

### Docker Compose (Alternative)

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
      - APP_ENV=production
      - BASE_URL=https://logam.gold
    restart: always
```

## Halaman Website

| Path | Halaman | Deskripsi |
|------|---------|-----------|
| `/` | Beranda | Hero section, corporate intro, layanan preview |
| `/tentang` | Tentang | Overview, visi misi, nilai perusahaan, milestone |
| `/layanan` | Layanan | Perdagangan, distribusi, kemitraan, korporasi |
| `/komitmen` | Komitmen | Kualitas, kepercayaan, etika, tata kelola |
| `/tata-kelola` | GCG | Prinsip GCG, implementasi, praktik bisnis |
| `/berita` | Berita | Berita & wawasan industri |
| `/faq` | FAQ | Pertanyaan yang sering diajukan |
| `/kontak` | Kontak | Form kontak, informasi kontak |

## Fitur

- Fully responsive (mobile, tablet, desktop, ultrawide)
- Server-side rendering
- SEO-friendly (meta tags, Open Graph, canonical URLs, sitemap, robots.txt)
- Formulir kontak dengan validasi client & server side
- Mobile hamburger menu
- Smooth scroll reveal animations
- FAQ accordion
- Sticky header
- Security headers (X-Content-Type-Options, X-Frame-Options, dll.)
- Compression (Brotli/Gzip)
- Custom error pages (404, 500)
- Docker-ready deployment
- Clean Go project structure

## Lisensi

© 2026 PT Logam Gold Mulia Tbk. Seluruh hak cipta dilindungi.