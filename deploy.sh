aws s3 sync ./ s3://early-man-film-testing --region ap-south-1 --delete --exclude ".git/*" --exclude ".gitignore" --exclude "README.md" --exclude "deploy.sh"
