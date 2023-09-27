import time
import requests

# Initialize counter
counter = 1

# Open the log file
with open("/logs/service1.log", "a") as log_file:
    while counter <= 20:
        try:
            # Compose the log entry
            log_entry = f"{counter} {time.strftime('%Y-%m-%dT%H:%M:%S.%fZ')} {requests.get('http://localhost:8000').text.strip()}\n"

            # Write to service1.log
            log_file.write(log_entry)

            # Send HTTP request to Service 2
            response = requests.post("http://localhost:8000", data=log_entry)

            if response.status_code != 200:
                # If sending fails, log the error
                log_file.write(f"Error sending to Service 2: {response.status_code}\n")
        except Exception as e:
            # Log any exceptions
            log_file.write(f"Exception: {str(e)}\n")

        # Increment the counter
        counter += 1
        time.sleep(2)

    # Write "STOP" to file "service1.log"
    log_file.write("STOP\n")

