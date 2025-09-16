import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

//user data
const members = {
  alice: { name: 'Alice Johnson', bio: 'Detailed bio here...', projects: ['Invoice App', 'Discord Bot'], image: '/images/alice.jpg' },
};

const TeamMember = () => {
  const { memberId } = useParams();
  const member = members[memberId];

  if(!member) return <p>Member not found.</p>;

  return (
    <>
      <Helmet>
        <title>{member.name} - Vivcy Labs</title>
        <meta name="description" content={`Learn more about ${member.name}.`} />
      </Helmet>
      <div className="card max-w-4xl mx-auto">
        <img src={member.image} alt={member.name} className="rounded-xl mb-6" />
        <h1 className="text-3xl font-bold text-pink-accent mb-4">{member.name}</h1>
        <p>{member.bio}</p>
        <h2 className="text-2xl mt-6">Projects</h2>
        <ul className="list-disc pl-6">
          {member.projects.map((proj) => <li key={proj}>{proj}</li>)}
        </ul>
      </div>
    </>
  );
};

export default TeamMember;