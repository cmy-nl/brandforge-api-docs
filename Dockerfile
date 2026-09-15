FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html provisioning-api.html whmcs-onboarding.html upmind.html /usr/share/nginx/html/
COPY assets /usr/share/nginx/html/assets
COPY partials /usr/share/nginx/html/partials
EXPOSE 80
