import Pusher, { Options } from 'pusher';

// Define the configuration options with type checking
const pusherConfig: Options = {
  appId: process.env.APP_ID!,
  key: process.env.KEY!,
  secret: process.env.SECRET!,
  cluster: process.env.CLUSTER!,
  useTLS: true,
};

// Initialize Pusher with the typed configuration
const pusher = new Pusher(pusherConfig);

export default pusher;
