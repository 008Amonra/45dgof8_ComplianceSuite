README: Deploying Synapt1 API on n8n.45dgof8.com

1. Upload contents to your server (e.g., ~/synapt1_api)
2. Run: pip install -r requirements.txt
3. Start with: sh start.sh
4. Ensure nginx is installed and replace its config with nginx.conf
5. Reload nginx: sudo nginx -s reload
6. Test endpoint: POST to https://n8n.45dgof8.com/check_trial_status
