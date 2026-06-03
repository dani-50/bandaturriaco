# Guida completa: dal computer a un sito online con dominio personalizzato

Guida scritta per la Società Filarmonica di Turriaco — sito costruito con Astro e ospitato su GitHub Pages.

---

## Indice

1. [Acquisire un dominio personalizzato](#1-acquisire-un-dominio-personalizzato)
2. [Creare un indirizzo email con il proprio dominio](#2-creare-un-indirizzo-email-con-il-proprio-dominio)
3. [Preparare il progetto Astro per GitHub Pages](#3-preparare-il-progetto-astro-per-github-pages)
4. [Caricare il sito su GitHub per la prima volta](#4-caricare-il-sito-su-github-per-la-prima-volta)
5. [Collegare il dominio personalizzato a GitHub Pages](#5-collegare-il-dominio-personalizzato-a-github-pages)
6. [Aggiornare il sito dopo la prima pubblicazione](#6-aggiornare-il-sito-dopo-la-prima-pubblicazione)
7. [Statistiche di visita del sito](#7-statistiche-di-visita-del-sito)
8. [Riepilogo dei costi](#8-riepilogo-dei-costi)

---

## 1. Acquisire un dominio personalizzato

### Che cos'è un dominio?
Il dominio è l'indirizzo del sito, ad esempio `www.filarmonicaturriaco.it`. Lo si "affitta" ogni anno da un **registrar** (azienda autorizzata a vendere domini).

### Quale estensione scegliere?
| Estensione | Prezzo medio/anno | Consigliato per |
|---|---|---|
| `.it` | 5–15 € | Associazioni italiane — la scelta migliore |
| `.com` | 10–15 € | Se il .it non è disponibile |
| `.org` | 10–15 € | Organizzazioni no-profit |
| `.eu` | 5–10 € | Alternativa europea |

**Raccomandazione:** scegliere `.it` — costa poco, è riconoscibile e dà credibilità a un'associazione italiana.

### Dove acquistare il dominio

I registrar più affidabili e usati in Italia:

| Registrar | Sito | Note |
|---|---|---|
| **Aruba** | aruba.it | Il più diffuso in Italia, assistenza in italiano |
| **Register.it** | register.it | Molto usato, buona assistenza |
| **Namecheap** | namecheap.com | Economico, interfaccia in inglese |
| **Porkbun** | porkbun.com | Tra i più economici, interfaccia in inglese |

### Procedura passo per passo (con Aruba, consigliato)

1. Andare su **[aruba.it](https://www.aruba.it)**
2. Cliccare su **"Domini"** nel menu in alto
3. Nella barra di ricerca, digitare il nome desiderato, es. `filarmonicaturriaco`
4. Aruba mostrerà se il dominio `.it` è disponibile — cliccare **"Aggiungi al carrello"**
5. Procedere al checkout: inserire i dati dell'associazione (ragione sociale, codice fiscale, indirizzo)
6. Pagare (carta di credito, PayPal o bonifico)
7. Ricevere per email la conferma di registrazione

> **Attenzione:** al momento dell'acquisto vi verrà proposto anche un piano di hosting. **Non acquistarlo** — userete GitHub Pages che è gratuito.

### Dati da tenere a portata di mano
Dopo l'acquisto avrete accesso al **pannello di controllo DNS** del dominio. Servirà al punto 5 di questa guida. Annotate:
- URL del pannello di controllo (es. `admin.aruba.it`)
- Nome utente e password del vostro account registrar

---

## 2. Creare un indirizzo email con il proprio dominio

Avere `info@filarmonicaturriaco.it` invece di `filarmonicaturriaco@gmail.com` dà un aspetto molto più professionale.

### Opzione A — Email Aruba (consigliata se avete già Aruba)

Aruba offre caselle email con il proprio dominio a circa **1 €/mese**.

1. Accedere al pannello Aruba
2. Andare su **"Email"** → **"Gestisci email"**
3. Cliccare **"Aggiungi casella email"**
4. Scegliere il nome (es. `info@filarmonicaturriaco.it`)
5. Impostare la password
6. Configurare il client email preferito (Outlook, Thunderbird, ecc.) con i dati IMAP/SMTP forniti da Aruba

### Opzione B — Zoho Mail (gratuita per 1 casella)

[Zoho Mail](https://www.zoho.com/mail/) offre **1 casella email gratuita** con dominio proprio — ottima per iniziare.

1. Andare su **zoho.com/mail** → cliccare **"Sign up for free"**
2. Scegliere il piano **"Free"** (1 utente, 5 GB)
3. Nella fase di configurazione, inserire il proprio dominio (es. `filarmonicaturriaco.it`)
4. Zoho fornirà dei **record MX** da aggiungere nel pannello DNS del dominio (vedi punto 5 per come accedere al pannello DNS)
5. Aggiungere i record MX forniti da Zoho nel pannello Aruba/registrar
6. Attendere qualche ora e la casella sarà attiva

### Opzione C — Google Workspace (a pagamento, la più comoda)

Costa circa **6 €/utente/mese** ma include Gmail con dominio proprio, Google Drive, Calendar, Meet.

---

## 3. Preparare il progetto Astro per GitHub Pages

Prima di caricare il sito, è necessario configurare Astro e aggiungere un file di automazione che pubblica il sito automaticamente ad ogni modifica.

### 3a. Installare Git

Se non è già installato:
1. Andare su **[git-scm.com](https://git-scm.com/download/win)**
2. Scaricare e installare Git per Windows (lasciare tutte le opzioni predefinite)
3. Verificare l'installazione aprendo PowerShell e digitando:
   ```
   git --version
   ```

### 3b. Creare un account GitHub

1. Andare su **[github.com](https://github.com)**
2. Cliccare **"Sign up"**
3. Scegliere un nome utente (es. `filarmonicaturriaco`) — questo apparirà nell'URL prima che si colleghi il dominio
4. Inserire email e password
5. Verificare l'account via email
6. Scegliere il piano **Free** (sufficiente per GitHub Pages)

### 3c. Modificare `astro.config.mjs`

Aprire il file `c:\Users\danil\DATA\FILARMONICA\SITO\bozza_astro\astro.config.mjs` e assicurarsi che contenga il proprio dominio nella riga `site`:

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.filarmonicaturriaco.it',  // <-- il vostro dominio
  trailingSlash: 'never',
});
```

### 3d. Creare il file di automazione (GitHub Actions)

Questo file dice a GitHub di ricostruire e pubblicare il sito automaticamente ogni volta che si carica una modifica.

Creare la cartella e il file seguenti:

**Percorso:** `bozza_astro/.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: npm
      - name: Install dependencies
        run: npm ci
      - name: Build with Astro
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Per creare il file con PowerShell (eseguire dalla cartella `bozza_astro`):

```powershell
New-Item -ItemType Directory -Force ".github\workflows" | Out-Null
# Poi creare il file .github/workflows/deploy.yml con il contenuto sopra
```

---

## 4. Caricare il sito su GitHub per la prima volta

### 4a. Creare un repository su GitHub

1. Accedere a **github.com** con il proprio account
2. Cliccare il **"+"** in alto a destra → **"New repository"**
3. Impostare:
   - **Repository name:** `filarmonicaturriaco.it` (o semplicemente `sito`)
   - **Description:** Sito della Società Filarmonica di Turriaco
   - **Public** (deve essere pubblico per GitHub Pages gratuito)
   - **NON** spuntare "Add a README file"
4. Cliccare **"Create repository"**
5. Copiare l'URL del repository che appare (es. `https://github.com/filarmonicaturriaco/filarmonicaturriaco.it.git`)

### 4b. Caricare il sito dal proprio computer

Aprire PowerShell nella cartella `bozza_astro` ed eseguire i comandi uno per uno:

```powershell
# Spostarsi nella cartella del progetto
cd "c:\Users\danil\DATA\FILARMONICA\SITO\bozza_astro"

# Configurare Git con nome e email (solo la prima volta in assoluto)
git config --global user.name "Filarmonica Turriaco"
git config --global user.email "info@filarmonicaturriaco.it"

# Inizializzare il repository Git locale
git init

# Aggiungere tutti i file
git add .

# Creare il primo commit (istantanea del progetto)
git commit -m "Prima pubblicazione del sito"

# Collegare al repository GitHub (sostituire l'URL con quello copiato al punto 4a)
git remote add origin https://github.com/filarmonicaturriaco/filarmonicaturriaco.it.git

# Caricare il tutto su GitHub
git push -u origin main
```

> Durante il `git push`, Windows potrebbe aprire una finestra di autenticazione GitHub — accedere con le credenziali dell'account.

### 4c. Abilitare GitHub Pages

1. Andare sul repository GitHub appena creato
2. Cliccare su **"Settings"** (tab in alto)
3. Nel menu a sinistra, cliccare **"Pages"**
4. Sotto **"Source"**, selezionare **"GitHub Actions"**
5. Cliccare **"Save"**

Dopo qualche minuto, GitHub eseguirà automaticamente il workflow e il sito sarà online. Si può seguire il progresso andando su **"Actions"** nel repository.

### 4d. Verificare che funzioni

Senza dominio personalizzato, il sito sarà temporaneamente accessibile all'indirizzo:
```
https://filarmonicaturriaco.github.io/filarmonicaturriaco.it/
```
(nome utente GitHub + nome repository)

---

## 5. Collegare il dominio personalizzato a GitHub Pages

### 5a. Configurare i DNS del dominio

Accedere al pannello di controllo del registrar (es. Aruba) e andare nella sezione **"DNS"** o **"Zona DNS"** del dominio.

Aggiungere i seguenti **record A** (puntano ai server di GitHub):

| Tipo | Nome/Host | Valore | TTL |
|---|---|---|---|
| A | `@` | `185.199.108.153` | 3600 |
| A | `@` | `185.199.109.153` | 3600 |
| A | `@` | `185.199.110.153` | 3600 |
| A | `@` | `185.199.111.153` | 3600 |
| CNAME | `www` | `filarmonicaturriaco.github.io` | 3600 |

> **Nota:** il `@` rappresenta il dominio radice (filarmonicaturriaco.it senza www). Il CNAME per `www` deve puntare al vostro username GitHub + `.github.io`.

### 5b. Aggiungere un file CNAME nel progetto

Nella cartella `bozza_astro/public/`, creare un file chiamato `CNAME` (senza estensione) con il solo contenuto:

```
www.filarmonicaturriaco.it
```

Questo file viene copiato automaticamente nella cartella `dist/` durante la build e dice a GitHub Pages quale dominio usare.

### 5c. Impostare il dominio personalizzato su GitHub

1. Andare su **Settings → Pages** nel repository GitHub
2. Sotto **"Custom domain"**, digitare `www.filarmonicaturriaco.it`
3. Cliccare **"Save"**
4. Spuntare **"Enforce HTTPS"** (apparirà dopo qualche minuto)

### 5d. Attendere la propagazione DNS

Le modifiche DNS impiegano da **30 minuti a 48 ore** per propagarsi in tutto il mondo. Di solito in Italia bastano 1-2 ore.

Per verificare che i DNS siano propagati, visitare **[dnschecker.org](https://dnschecker.org)** e inserire il proprio dominio.

---

## 6. Aggiornare il sito dopo la prima pubblicazione

Ogni volta che si modificano file nel progetto e si vuole pubblicare le modifiche:

```powershell
# Spostarsi nella cartella del progetto
cd "c:\Users\danil\DATA\FILARMONICA\SITO\bozza_astro"

# Verificare quali file sono stati modificati
git status

# Aggiungere tutti i file modificati
git add .

# Creare un commit con una descrizione della modifica
git commit -m "Aggiornamento eventi estate 2026"

# Caricare su GitHub (il sito si aggiorna automaticamente in 2-3 minuti)
git push
```

### Cosa succede dopo il push?
1. GitHub riceve i file modificati
2. GitHub Actions esegue automaticamente il workflow `deploy.yml`
3. Astro ricompila il sito
4. Il sito aggiornato va online in **2-3 minuti**

Si può seguire il progresso su: `github.com/[nomeutente]/[repository] → Actions`

### Consigli pratici per gli aggiornamenti

- **Prima di modificare**, eseguire `git pull` per assicurarsi di avere l'ultima versione
- **Testare sempre in locale** con `npm run dev` prima di fare push
- Usare messaggi di commit descrittivi: `"Aggiunto concerto 15 agosto"` è meglio di `"aggiornamento"`

---

## 7. Statistiche di visita del sito

GitHub Pages **non fornisce statistiche** di visita. Bisogna usare uno strumento esterno.

### Opzione A — Google Analytics (gratuita, la più diffusa)

**Pro:** gratuita, dati dettagliatissimi, si integra con Google Search Console
**Contro:** raccoglie molti dati personali, richiede il banner cookie

#### Installazione:

1. Andare su **[analytics.google.com](https://analytics.google.com)**
2. Accedere con un account Google
3. Cliccare **"Inizia a misurare"**
4. Creare una **proprietà** (inserire nome sito, fuso orario Italia, valuta Euro)
5. Scegliere come tipo di raccolta dati **"Web"**
6. Inserire l'URL del sito e il nome del sito
7. Google fornirà un **Measurement ID** del tipo `G-XXXXXXXXXX`

#### Aggiungere il codice al sito Astro:

Aprire `src/layouts/BaseLayout.astro` e aggiungere nel `<head>`, subito prima della chiusura `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Sostituire `G-XXXXXXXXXX` con il proprio Measurement ID.

Poi fare il push delle modifiche — le statistiche inizieranno ad accumularsi entro 24-48 ore.

#### Cosa si può vedere:
- Numero di visitatori al giorno/settimana/mese
- Pagine più visitate
- Da dove vengono i visitatori (paese, città)
- Quanto tempo restano sul sito
- Da quale dispositivo accedono (mobile, PC, tablet)
- Come hanno trovato il sito (Google, Facebook, link diretto)

---

### Opzione B — Plausible Analytics (a pagamento, rispettosa della privacy)

**Pro:** rispettosa della privacy, non richiede banner cookie, interfaccia semplicissima
**Contro:** costa 9 €/mese (o 90 €/anno)

1. Andare su **[plausible.io](https://plausible.io)** → **"Start free trial"**
2. Inserire il dominio del sito
3. Aggiungere nel `<head>` del `BaseLayout.astro`:
   ```html
   <script defer data-domain="filarmonicaturriaco.it" src="https://plausible.io/js/script.js"></script>
   ```
4. Fare il push — le statistiche inizieranno subito

---

### Opzione C — Cloudflare Analytics (gratuita, no cookie banner)

Se si usa Cloudflare per gestire i DNS (non obbligatorio ma consigliato), si ottengono statistiche di traffico **gratuite e senza cookie** direttamente nel pannello Cloudflare.

**Come attivare Cloudflare:**

1. Andare su **[cloudflare.com](https://cloudflare.com)** → **"Sign up"** → piano Free
2. Aggiungere il proprio dominio
3. Cloudflare fornirà nuovi **nameserver** (es. `ada.ns.cloudflare.com`)
4. Andare nel pannello del registrar (Aruba) → **"Nameserver"** e sostituire quelli esistenti con quelli di Cloudflare
5. Attendere alcune ore per la propagazione
6. Da quel momento, i DNS si gestiscono da Cloudflare (che è più comodo di Aruba)
7. Le statistiche base di traffico sono visibili in **Cloudflare → Analytics**

> **Consiglio:** usare Cloudflare per i DNS è comunque una buona pratica anche senza Google Analytics — protegge il sito, lo velocizza e fornisce statistiche di base gratuite.

---

### Opzione D — Google Search Console (gratuita, per il posizionamento su Google)

Non conta le visite, ma mostra **quante volte il sito appare nelle ricerche Google** e per quali parole chiave. Complementare a Google Analytics.

1. Andare su **[search.google.com/search-console](https://search.google.com/search-console)**
2. Cliccare **"Aggiungi proprietà"** → **"Prefisso URL"** → inserire `https://www.filarmonicaturriaco.it`
3. Verificare il possesso del dominio (scegliere il metodo **"File HTML"**: scaricare il file, metterlo in `public/`, fare push)
4. Dopo la verifica, Google inizierà a indicizzare il sito

---

## 8. Riepilogo dei costi

| Voce | Costo | Frequenza |
|---|---|---|
| Dominio `.it` (es. Aruba) | 5–15 € | Annuale |
| GitHub Pages | **0 €** | — |
| Email con dominio (Aruba) | ~12 € | Annuale |
| **oppure** Email Zoho (1 casella) | **0 €** | — |
| Google Analytics | **0 €** | — |
| Google Search Console | **0 €** | — |
| Cloudflare (piano Free) | **0 €** | — |
| **Totale minimo** | **~5–15 €/anno** | Solo il dominio |

---

## Checklist finale

- [ ] Dominio registrato (es. su Aruba)
- [ ] Account GitHub creato
- [ ] File `.github/workflows/deploy.yml` aggiunto al progetto
- [ ] File `public/CNAME` creato con il proprio dominio
- [ ] `astro.config.mjs` aggiornato con il dominio nella riga `site:`
- [ ] Repository GitHub creato e codice caricato (`git push`)
- [ ] GitHub Pages abilitato (Settings → Pages → GitHub Actions)
- [ ] Record DNS configurati nel pannello del registrar (4 record A + 1 CNAME)
- [ ] Dominio personalizzato impostato in GitHub Pages settings
- [ ] HTTPS abilitato (Enforce HTTPS)
- [ ] Google Analytics o alternativa installata nel `BaseLayout.astro`
- [ ] Sito verificato su Google Search Console

---

*Guida scritta per la Società Filarmonica di Turriaco — giugno 2026*
