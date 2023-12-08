import { TListItem, ListItem } from "./ListItem";

interface ListProps {
  items: TListItem[];
  onClick: any;
}

export const List = ({ items, onClick }: ListProps) => {
  return (
    <ul>
      {items.map((item) => (
        <ListItem item={item} key={item.id} onClick={onClick} />
      ))}
    </ul>
  );
};
