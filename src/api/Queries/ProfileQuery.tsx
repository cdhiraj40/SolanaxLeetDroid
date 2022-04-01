const PROFILE_QUERY = `
    query getUserProfile($username: String!) {
        allQuestionsCount {
          difficulty
          count
          __typename
        }
        matchedUser(username: $username) {
          username
          socialAccounts
          githubUrl
          contributions {
            points
            questionCount
            testcaseCount
          }
          profile {
            realName
            websites
            countryName
            skillTags
            company
            school
            starRating
            aboutMe
            userAvatar
            reputation
            ranking
          }
          submitStats: submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
            totalSubmissionNum {
              difficulty
              count
              submissions
            }
          }
        }
      } 
    `
export default PROFILE_QUERY;