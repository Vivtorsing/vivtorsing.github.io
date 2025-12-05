import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

//images
import vivtorsing from '../images/MemberImage/vivtorsing.jpg';
import UselessBotLogo from '../images/UselessBotLogo.png';
import VivtorCraftLogo from '../images/VivtorCraftLogo.png';

//all the team members
const team = [
  {id: 'vivtorsing', name: 'Vivtorsing', role: 'The Boss', bio: 'Does boss things', image: vivtorsing, hasPage: true },
  {id: 'vj', name: 'VJ', role: 'Founding Engineer', bio: 'Loves coding and building new things!', image: UselessBotLogo, hasPage: false },
  {id: 'vivtoria', name: 'Vivtoria', role: 'Bug Tester', bio: 'Wait why are you here?', image: UselessBotLogo, hasPage: false},
  //server members
  {id: 'owner', name: 'Owner', role: 'VivtorCraft Server Owner', bio: 'Maintains and takes care of the Minecraft server!', image: VivtorCraftLogo, hasPage: false},
  {id: 'flowers', name: 'Flowers', role: 'VivtorCraft Server Co-Owner', bio: 'Maintains and takes care of the Minecraft server!', image: VivtorCraftLogo, hasPage: false},
  {id: '2dark4me', name: '2dark4me', role: 'VivtorCraft Server Admin', bio: 'Takes care of distant players', image: VivtorCraftLogo, hasPage: false},
  {id: 'pink', name: 'Pink', role: 'VivtorCraft Server Admin', bio: 'Moderates and maintains chat', image: VivtorCraftLogo, hasPage: false},
  {id: 'aarielle', name: 'Aarielle', role: 'VivtorCraft Server Admin', bio: 'Server Updater', image: VivtorCraftLogo, hasPage: false},
  {id: 'gabby', name: 'Gabby', role: 'VivtorCraft Server Admin', bio: 'Moderates certain parts of the server', image: VivtorCraftLogo, hasPage: false},
  {id: 'julia', name: 'Julia', role: 'VivtorCraft Scale Server Owner', bio: 'Maintains the Scale server of the VivtorCraft Server!', image: VivtorCraftLogo, hasPage: false},
  {id: 'olivia', name: 'Olivia', role: 'VivtorCraft Cozy Server Owner', bio: 'Maintains the Cozy server of the VivtorCraft Server!', image: VivtorCraftLogo, hasPage: false},
  {id: 'cherrytail', name: 'Cherrytail', role: 'VivtorCraft Server Admin', bio: 'Takes care of the Main Server', image: VivtorCraftLogo, hasPage: false},
  {id: 'daaiisy', name: 'Daaiisy', role: 'VivtorCraft Server Admin', bio: 'Takes care of the Main Server', image: VivtorCraftLogo, hasPage: false},
  {id: 'cloudforeal', name: 'CloudForeal', role: 'VivtorCraft Server Admin', bio: 'Takes care of the Main Server', image: VivtorCraftLogo, hasPage: false},
  {id: 'glitterbunny', name: 'Glitter_bunny', role: 'VivtorCraft Server Admin', bio: 'Takes care of the Main Server', image: VivtorCraftLogo, hasPage: false},
  {id: 'bob', name: 'Bob', role: 'Video Editor', bio: 'Edits some amazing videos!', image: VivtorCraftLogo, hasPage: false},
  {id: 'more', name: 'And More!', role: '', bio: 'We will add more slowly!', image: UselessBotLogo, hasPage: false },
];

const Team = () => {
  return (
    <>
      <Helmet>
        <title>Team - Vivcy Labs</title>
        <meta name="description" content="Meet the talented team behind Vivcy Labs." />
      </Helmet>
      <h1 className="text-3xl font-bold text-pink-accent mb-8">Our Team</h1>
      <h2 className="text-2xl font-bold text-pink-accent mb-4">All the members that have worked with us!</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {team.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="card text-center"
          >
            <img src={member.image} alt={member.name} className="rounded-full w-32 h-32 mx-auto mb-4" />
            <h2 className="text-xl font-semibold">{member.name}</h2>
            <p className="text-pink-light">{member.role}</p>
            <p>{member.bio}</p>
            {member.hasPage && (
              <Link to={`/team/${member.id}`} className="btn-pink mt-4 inline-block">Learn More</Link>
            )}
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default Team;