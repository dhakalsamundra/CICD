FROM python:3.8
WORKDIR /app
COPY . /app
RUN pip install -r requirements.txt
EXPOSE 80
ENV SERVICE_NAME="Service1"
CMD [ "python", "service1.py" ]