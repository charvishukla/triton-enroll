import React from 'react';
import econCollection from './econCollection.png';

const AboutPage = () => {

  const containerStyle = {
    textAlign: 'left',
    marginLeft: '100px',
    marginRight: '100px'
  };

  const headerStyle = {
    marginTop: '0'
  }

  const aboutParagraphStyle = {
    marginBottom: '15px',
  };

  const subheadingStyle = {
    marginTop: '15px',
    marginBottom: '15px',
  };

  const ulStyle = {
    marginTop: '15px',
    marginBottom: '15px',
    paddingLeft: '20px',
  };

  const whitebg = {
    backgroundColor: 'white',
    marginRight: '600px',
    borderRadius: '10px' 
  };

  const imageStyle = {
    width: '800px', 
    height: 'auto', // maintain aspect ratio
    borderRadius: '10px', 
  };

  const emptySpaceStyle = {
    height: '100px', 
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>About</h1>
      <h2 style={subheadingStyle} >What this application does.</h2>
      <p style={aboutParagraphStyle}>
        It is often tedious to add recurring events to calendar for all your classes. The purpose of Triton-enroll is to save your precious time, and help you be organized in college!
      </p>
      <p style={aboutParagraphStyle}>
        This web application allows you to visualize, and then subsequently download your schedule really easily. Currently, it only creates .ics files available for download on Mac. The app is more user-friendly, does not require SSO login, and (I argue) has a better UI than Webreg. This website will also tell you the current waitlist counts, so if you have not enrolled already, you can access information about total/available seats in a given course :)
      </p>

      <h2 style={subheadingStyle} >Limitations (And potential improvements)</h2>
      <p style={aboutParagraphStyle}>
        Since the schedule of classes comes out halfway through the quarter, I update the database with new courses. I get limited storage in the free plan, which is why I am not able to populate my database with data from all possible quarters!
      </p>
      <p style={aboutParagraphStyle}>
        Here are the metrics from populating the database once (i.e., for the first time):
        {/* include graphic */}
      </p>

      <h2 style={subheadingStyle} >Tech Stack</h2>

      <h3>Backend</h3>
      <ul style={ulStyle}>
        <li>Firebase Firestore DB (see Database Structure)</li>
          <ul style={ulStyle}>
            <li>Client-side SDK</li>
            <li>Admin SDK</li>
          </ul>
        <li>Firebase cloud functions</li>
        <li>Express</li>
        <li>cors</li>
        <li>date-fns</li>
        <li>Axios</li>
        <li>ical.js</li>
        <li>Wrote my own parser (see parser section)</li>
      </ul>

      <h3>Frontend</h3>
      <ul style={ulStyle}>
        <li>React (via CRA)</li>
          <ul style={ulStyle}>
            <li>React Big Calendar</li>
            <li>React DOM</li>
            <li>React router dom</li>
          </ul>
        <li>CSS</li>
        <li>CSS modules</li>
        <li>Random website where I found this cool font from:</li>
      </ul>

      <h3>Hosting</h3>
      <ul style={ulStyle}>
        <li>Vercel</li>
      </ul>

      <h3>Other</h3>
      <ul style={ulStyle}>
        <li>Chalk (Color Coding print statements is game-changing)</li>
      </ul >

      <h2>Database Structure</h2>
      <p style={aboutParagraphStyle}>This is the general structure:</p>
      <pre style={whitebg}>
        <code>
        {`
 DepartmentCollection1
	CourseDocument1
		name 
		units 
		code 
		Section SubCollection1 (Lecture)
			section name 
			instructor 
			from 
			to 
			location 
			waitlist
			totalSeats
		Section SubCollection2 (Discussion 1)
			section name 
			instructor 
			from 
			to 
			location 
			waitlist
			totalSeats
		Section SubCollection3 (Discussion 2)
			. . . 
	CourseDocument2
	CourseDocument3
	.
	.
	.
 DepartmentCollection2
 DepartmentCollection3
 DepartmentCollection4
	. . . 
	. . .
	. . .
  
  `}
        </code>
      </pre>
      <p style={aboutParagraphStyle}>Here is what it looks like inside the project, this is an example of an ECON Collection:</p>
      <img style={imageStyle} src={econCollection} alt="econCollection" />

      <h2 style={subheadingStyle}>Parser</h2>
      <p style={aboutParagraphStyle}>
        This was *the* hardest part about this project. While I was trying to fetch course data from, I realized that upon sending a POST request to UCSD's server, the response is a whole entire (poorly formatted) HTML page. Moreover, all the course data for a given major is not available on a singular page (rip). The website sends a GET request to fetch the next page.
      </p>
      <p style={aboutParagraphStyle}>
        I wrote two scripts in JavaScript (no, I was not able to use existing libraries to parse HTML files) to parse the HTML files to extract relevant data. And yes, this involved getting elements by classNames, IDs, iterating through 'tr' and 'td' objects in the tables, and even using regular expressions to parse strings!
      </p>

      <h2 style={subheadingStyle} >About me</h2>
      <p style={aboutParagraphStyle}>
        <a href="https://charvishukla.github.io/"> Website!</a>
      </p>
      <p style={aboutParagraphStyle}>
        Email: cshukla at ucsd dot edu
      </p>
      <p style={aboutParagraphStyle}>Thanks for reading!</p>
    </div>
  );
};

export default AboutPage;


