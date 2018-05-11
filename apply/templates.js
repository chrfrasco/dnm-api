const renderLink = url => `<a href="${url}">${url}</a>`;
const renderEmailLink = url => renderLink(`mailto:${url}`);

const emailText = submission => `
Name: ${submission["first-name"]} ${submission["last-name"]}
Email: ${submission.email}
Bio: ${submission.bio}
Field: ${submission.field}
Region: ${submission.region}
Portfolio URL: ${submission.portfolio}
Social URLs:
${submission["social-media"].map(social => `  - ${social}`).join("\n")}
`;

const emailHTML = submission => `
<p>
  <span style="font-weight: bold;">Name:</span>
  ${submission["first-name"]} ${submission["last-name"]}
</p>
<p>
  <span style="font-weight: bold;">Email:</span>
  ${renderEmailLink(submission.email)}
</p>
<p><span style="font-weight: bold;">Bio:</span> ${submission.bio}</p>
<p><span style="font-weight: bold;">Field:</span> ${submission.field}</p>
<p><span style="font-weight: bold;">Region:</span> ${submission.region}</p>
<p>
  <span style="font-weight: bold;">Portfolio URL:</span>
  ${renderLink(submission.portfolio)}
</p>
<p><span style="font-weight: bold;">Social URLs:</span></p>
<ul>
  ${submission["social-media"]
    .map(social => `<li>${renderLink(social)}</li>`)
    .join("\n")}
</ul>
`;

module.exports = { emailText, emailHTML };
