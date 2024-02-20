This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Starten des Servers

Zuerst müssen sie auf OpenAI Seite eine API-Key erstellen:
https://openai.com

Diesen müssen sie dann kopieren und in der Datei ".env.local" bei "Hier API Key von OpenAI einfügen" einfügen.

navigiere Sie nun in den "DALL-E" Ordner

```bash
npm i
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000)mit dem Prowser um die App zu sehen.

## Aufbau

Diese Applikation besteht aus folgenden Komponenten:

- Next,js
- React.js
- Tailwind.css

- page.js ist die Hauptanwendung.
- /api/openai/route.js ist die API Einbindung hinterlegt. 
- /components/OptionsbUttons.js werden die Konfikurations-Buttons erstellt und gestyled
- /lib/constants.js sind alle Werte der Buttons. Hier kann man sie ändern, neue hinzufügen oder aktuelle löschen.


## Anwendung

Wenn die Webseite geöffnet ist kann der User im obrigen Inputfeld sein Bild beschreiben. 
Danach kann er durch die Buttons darunter noch weiter Konfigurationen seiner Beschreibung per Klick hinzufügen. 
Als nächstes muss er die Anzahl der generierten Bilder auswählen. Wenn das alles passt kann er mit dem Button "Bilder generiern" sich die Bilder erstellen lassen. 

Per Klick auf die generierten Bilder kann er sie nun Auswählen und Speichern. 
