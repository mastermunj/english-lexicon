
green=`tput setaf 2`
reset=`tput sgr0`

e() {
  echo "\n\n${green}$1${reset}"
}

e "Removing remote origin"
git remote rm origin

e "Creating new temporary branch"
git checkout -b temporary

e "Deleting master branch"
git branch -D master

e "Re-init master branch"
git checkout --orphan master

e "Untrack all files"
git rm --cached -r .

e "Deleting temporary branch"
git branch -D temporary

e "Running npm install"
npm install

e "Remove reset.sh for safety"
rm reset.sh

# e "Add all files to repo"
# git add --all

# e "Doing initial commit"
# git commit -m "init: initial commit"

e "The project is ready!\n\n"