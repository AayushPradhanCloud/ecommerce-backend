FROM casbin/casdoor:latest

USER root

# Install timezone database on Alpine
RUN apk add --no-cache tzdata

# Set timezone environment
ENV TZ=Asia/Kathmandu

USER casdoor
