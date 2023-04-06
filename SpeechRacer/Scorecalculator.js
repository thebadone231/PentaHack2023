export default function Calculator(s1, s2) {
    // Convert both strings to lowercase
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    // Initialize the distance matrix
    var d = [];
    for (var i = 0; i <= s1.length; i++) {
        d[i] = [];
        d[i][0] = i;
    }
    for (var j = 0; j <= s2.length; j++) {
        d[0][j] = j;
    }

    // Fill in the rest of the matrix
    for (var i = 1; i <= s1.length; i++) {
        for (var j = 1; j <= s2.length; j++) {
            if (s1[i - 1] == s2[j - 1]) {
                d[i][j] = d[i - 1][j - 1];
            } else {
                d[i][j] = Math.min(
                    d[i - 1][j] + 1,  // Deletion
                    d[i][j - 1] + 1,  // Insertion
                    d[i - 1][j - 1] + 1 // Substitution
                );
            }
        }
    }

    // Return the Levenshtein distance
    return Math.round((1-(d[s1.length][s2.length]/Math.max(s1.length,s2.length))) * 100);

}