# Jobs Component Guide

This guide explains how the Jobs component works and how to troubleshoot common issues.

## Overview

The Jobs component displays job listings from mock data. It includes features like:

- Searching for jobs
- Filtering jobs by category, location, and experience
- Viewing job details
- Applying for jobs

## How It Works

1. **Data Source**: The component uses mock data from `src/data/mockJobs.js` instead of fetching from a backend API.
2. **State Management**: The JobContext provider in `src/components/context/JobContext.js` manages the job data.
3. **UI Components**: The Jobs component in `src/components/Jobs.js` renders the job listings and filters.

## Troubleshooting

### Jobs Not Displaying

If jobs are not displaying on the page:

1. **Check the Console**: Open your browser's developer tools (F12) and check the console for errors.
2. **Verify Mock Data**: Make sure the mock data in `src/data/mockJobs.js` is properly formatted.
3. **Check JobContext**: Ensure the JobContext provider is properly set up in `index.js`.
4. **Check Component Rendering**: Verify that the Jobs component is being rendered correctly in `App.js`.

### Error: "Cannot read properties of undefined (reading 'toLowerCase')"

This error occurs when the component tries to call `toLowerCase()` on an undefined value. To fix it:

1. Make sure the mock data has all required fields (position, category, jobLocation, experience).
2. Check that the Jobs component has proper null/undefined checks.
3. Verify that the JobContext is providing the jobs data correctly.

### Filters Not Working

If the filters are not working correctly:

1. Check that the filter functions in the Jobs component are being called.
2. Verify that the filter values are being updated correctly.
3. Make sure the filter logic is correct.

## Customizing the Jobs Component

### Adding New Job Fields

To add new fields to the job listings:

1. Update the mock data in `src/data/mockJobs.js` to include the new fields.
2. Modify the Jobs component to display the new fields.
3. Update the job detail modal to show the new fields.

### Changing the Application Form

The "Apply Now" button currently links to a Google Form. To change this:

1. Update the URL in the Jobs component:
   ```jsx
   <a
     href="YOUR_NEW_URL"
     target="_blank"
     rel="noopener noreferrer"
     className="btn btn-danger btn-sm"
   >
     <i className="bi bi-send me-1"></i> Apply Now
   </a>
   ```

### Customizing the Filters

To add or modify filters:

1. Update the filters state in the Jobs component:
   ```jsx
   const [filters, setFilters] = useState({
     category: "",
     location: "",
     experience: "",
     // Add new filters here
     jobType: ""
   });
   ```

2. Add the new filter UI elements to the component.
3. Update the filterJobs function to include the new filters.

## Deployment Considerations

When deploying the Jobs component to production:

1. **Performance**: The component uses client-side filtering, which works well for small datasets. For larger datasets, consider implementing server-side filtering.
2. **SEO**: Since the job listings are rendered client-side, they may not be indexed by search engines. Consider implementing server-side rendering for better SEO.
3. **Analytics**: Add analytics tracking to monitor how users interact with the job listings.

## Future Improvements

Potential improvements to the Jobs component:

1. **Pagination**: Add pagination for large numbers of job listings.
2. **Sorting**: Allow users to sort jobs by different criteria.
3. **Saved Jobs**: Allow users to save jobs for later viewing.
4. **Job Alerts**: Implement job alerts for new job postings.
5. **Integration with Real Backend**: Replace mock data with real API calls when a backend is available.
