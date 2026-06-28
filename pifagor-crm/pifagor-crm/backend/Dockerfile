FROM python:3.11-slim

WORKDIR /workspace

COPY requirements.txt ./backend/requirements.txt
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir --default-timeout=1000 -r backend/requirements.txt

COPY . ./backend/

ENV PYTHONPATH=/workspace
WORKDIR /workspace/backend

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
