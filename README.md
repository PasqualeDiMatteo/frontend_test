# Vue.js Frontend_test

Questa è una semplice applicazione Vue.js che utilizza Docker per il deploy.

## Prerequisiti

Assicurati aver avviato prima app di Backend

## Come usare

### 1. Costruire l'immagine Docker

Per creare l'immagine Docker dell'app Vue.js, utilizza il seguente comando:

```bash
docker build -t vuejs-app .
```

### 2. Eseguire il container

Per eseguire l'applicazione all'interno di un container Docker, usa il comando:

```bash
docker run -it -p 8080:80 --rm --name vuejs-app-1 vuejs-app
```

### 3. Accesso all'app

Apri il browser e visita:

```
http://localhost:8080
```

L'app dovrebbe essere visibile e funzionante.
