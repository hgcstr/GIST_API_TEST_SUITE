#cURL calls from the Github Gist ... that's not my token ;) 


#CREATE
curl -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer github_pat_11AMBKGCA0nTzBjOw4six8_YU2JtbrL73L6B4ROPNXCsdZi" \
  -d '{"description":"Test Gist","public":false,"files":{"test.txt":{"content":"This is a test gist."}}}' \
  https://api.github.com/gists


##LIST GIST FOR THE AUTH USER
  curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer github_pat_11AMBKGCA0nTzBl0LZ3ID2JtbrL73L6B4ROPNXCsdZi" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/gists


##PUBLIC GIST GET
  curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer github_pat_11AMBKGCA0nTzBjOw4st3FYz1H2CTVWzTSSTAl0LZ3ID2JtbrL73L6B4ROPNXCsdZi" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/gists/public


  #GET a gist by ID

curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer github_pat_11AMBKGCA0nTzBjOw4six8z1H2CTVWzTSSTAl0LZ3ID2JtbrL73L6B4ROPNXCsdZi" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/gists/5be94527cd0c1daa87f4e9d4519ed948


##UPDATE GIST
curl -L \
  -X PATCH \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer github_pat_11AMBKGCA0nTzBjOw4six8_YUID2JtbrL73L6B4ROPNXCsdZi" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/gists/e5aacfd8870ae2174463627ac0392cbe \
  -d '{"description":"An updated gist description","files":{"test.json":{"content":"Hello World from GitHub"}},"public": true}'


  #DELETE GIST
  curl -L \
  -X DELETE \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer github_pat_11AMBKGCA0nTzBjOw4six8_YU2YiSTAl0LZ3ID2JtbrL73L6B4ROPNXCsdZi" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/gists/e5aacfd8870ae2174463627ac0392cbe \




#LIST USER GIST
curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/users/USERNAME/gists
