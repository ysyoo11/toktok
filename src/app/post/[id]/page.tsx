type Props = {
  params: {
    id: string;
  };
};

// TODO:
export default function PostDetailPage({ params: { id } }: Props) {
  return <div>post detail page - id: {id}</div>;
}
