


export function formatDate(originalDateString) {
        const originalDate = new Date(originalDateString);
        const formattedDate = originalDate.toISOString().split('T')[0];
        return formattedDate;
    }
  

    