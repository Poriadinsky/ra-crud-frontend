export type TListItem = {
  content: string;
  id: string;
};

interface ListItemProps {
  item: TListItem;
  onClick: any;
}

export const ListItem = ({ item, onClick }: ListItemProps) => {
  const { id, content } = item;
  return (
    <li className="post" id={id}>
      <div>{content}</div>
      <button className="delete" onClick={onClick}></button>
    </li>
  );
};
