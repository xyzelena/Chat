import { useGetMessagesQuery } from '../../api/messagesApi.js';

const ListMessages = () => {
  const { data, error, isLoading, refetch } = useGetMessagesQuery();
  // console.log(data);

  return (
    <>
      <div className="text-break mb-2">
        <b>admin</b>: msg 1
      </div>
      <div className="text-break mb-2">
        <b>admin</b>: msg 2
      </div>
    </>
  );
};

export default ListMessages;
