FROM mcr.microsoft.com/playwright:v1.63.0-noble

WORKDIR /app

USER root

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    xvfb \
    x11vnc \
    fluxbox \
    novnc \
    websockify \
    x11-utils && \
    rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./

RUN npm ci --ignore-scripts=false

COPY . .

EXPOSE 8931 5900 6080

CMD ["bash", "-c", "export DISPLAY=:99; Xvfb :99 -screen 0 1920x1080x24 & while ! xdpyinfo -display :99 >/dev/null 2>&1; do sleep 0.5; done; fluxbox >/tmp/fluxbox.log 2>&1 & x11vnc -display :99 -forever -shared -rfbport 5900 -nopw >/tmp/x11vnc.log 2>&1 & websockify --web=/usr/share/novnc/ 6080 localhost:5900 >/tmp/novnc.log 2>&1 & exec npx playwright run-test-mcp-server --host 0.0.0.0 --port 8931"]