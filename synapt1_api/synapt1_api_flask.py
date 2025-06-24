from flask import Flask, request, jsonify
from datetime import datetime, timedelta

app = Flask(__name__)

TRIAL_DAYS = 7
user_trials = {}

@app.route("/start_trial", methods=["POST"])
def start_trial():
    data = request.json
    user_id = data.get("user_id")
    gpt_type = data.get("gpt_type")
    key = user_id + gpt_type

    if key not in user_trials:
        user_trials[key] = {
            "start_date": datetime.now().isoformat(),
            "gpt_type": gpt_type
        }
        return jsonify({"status": "active", "trial_days_left": TRIAL_DAYS})
    else:
        return jsonify({"status": "already_started"})

@app.route("/check_trial_status", methods=["POST"])
def check_trial_status():
    data = request.json
    user_id = data.get("user_id")
    gpt_type = data.get("gpt_type")
    key = user_id + gpt_type

    if key not in user_trials:
        return jsonify({"status": "not_started", "trial_days_left": TRIAL_DAYS})

    start_date = datetime.fromisoformat(user_trials[key]["start_date"])
    end_date = start_date + timedelta(days=TRIAL_DAYS)
    remaining = (end_date - datetime.now()).days

    if remaining >= 0:
        return jsonify({"status": "active", "trial_days_left": remaining})
    else:
        return jsonify({
            "status": "expired",
            "trial_days_left": 0,
            "redirect_url": "https://chat.openai.com/g/g-67d8be53451c8191a43158fc91e5a44e"
        })

if __name__ == "__main__":
    app.run(port=5000)
