import { use, useMemo } from "react"
import {
  Heart,
} from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/ui/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/ui/custom/CustomPagination"
import { CustomBreadcrumbs } from "@/components/ui/custom/CustomBreadcrumbs"
import { useSearchParams } from "react-router"

// import { getSummaryAction } from "@/heroes/actions/get-summary.action"
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary"
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero"
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext"


export const HomePage = () => {

  // const { data: summary } =  useQuery({
  //       queryKey:['summary-information'],
  //       queryFn: () => getSummaryAction(),
  //       staleTime: 1000 * 60 * 5,

  //   });


  const {favoriteCount, favorites} = use(FavoriteHeroContext);


  const [ searchParams, setSearchParams ] = useSearchParams();
  
  const activeTab = searchParams.get('tab') ??  'all';
  const page = searchParams.get('page') ??  '1';
  const limit = searchParams.get('limit') ?? '6';
  const category = searchParams.get('category') ?? 'all';

  console.log({ activeTab });

  //'selectedtab' es el 'activetab' pero validado
  const selectedTab = useMemo(() => {
    const validTab = ['all' , 'favorites' , 'heroes' , 'villains'];
    //si dentro de las tab validas se encuentra el actual, se queda, sino (?) se cambia por defecto a 'all'
    return validTab.includes(activeTab) ? activeTab : 'all';
  },[activeTab])


  console.log( searchParams.get('page') );
  console.log( searchParams.get('offset') );

  // const [activeTab, setActiveTab] = useState<
  // 'all' | 'favorites' | 'heroes' | 'villains'
  // >('all');

  // const { data: HeroesResponse } = useQuery({
  //   queryKey: ['heroes', { page, limit }],
  //   queryFn: () => getHeroesByPageAction(+page, +limit),
  //   staleTime: 1000 * 60 * 5, //5 minutos
  // });

  const { data: HeroesResponse } = usePaginatedHero(page, limit, category);
  const { data: summary } = useHeroSummary();



  // console.log({ HeroesResponse });
  // useEffect(() => {
  //   getHeroesByPage().then();
  // }, [])
  
  return (
    <>
      <>

        {/* Header */}
        <CustomJumbotron 
        title="Universo de SuperHéroes"
        description="Descubre, explora y administra super héroes y villanos"
        />

        {/* Breadcrumbs */}
        <CustomBreadcrumbs currentPage="Super Héroes"/>

        {/* Stats Dashboard */}
        <HeroStats />

        

        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" onClick={ () => setSearchParams((prev) => {
              prev.set('tab','all');
              prev.set('category','all');
              prev.set('page','1');
              return prev;
            }) }
            >All Characters ({summary?.totalHeroes})</TabsTrigger>
            <TabsTrigger value="favorites" onClick={ () => setSearchParams((prev) => {
              prev.set('tab','favorites');
              return prev;
            }) } className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Favorites ({favoriteCount});
            </TabsTrigger>
            <TabsTrigger value="heroes" onClick={ () => setSearchParams((prev) => {
              prev.set('tab','heroes');
              prev.set('category','hero');
              prev.set('page','1');
              return prev;
            }) }>Heroes ({summary?.heroCount})</TabsTrigger>
            <TabsTrigger value="villains" onClick={ () => setSearchParams((prev) => {
              prev.set('tab','villains');
              prev.set('category','villain');
              prev.set('page','1');
              return prev;
            }) }>Villains ({summary?.villainCount})</TabsTrigger>
            

            
          </TabsList>

          <TabsContent value="all">
            {/* mostrar todos los personajes */}
            <HeroGrid heroes={ HeroesResponse?.heroes ?? [] }/>
          </TabsContent>
          <TabsContent value="favorites">
            {/* mostrar todos los personajes favoritos */}
            <HeroGrid heroes={ favorites }/>
          </TabsContent>
          <TabsContent value="heroes">
            {/* mostrar todos los heroes */}
            <HeroGrid heroes={ HeroesResponse?.heroes ?? [] }/>
          </TabsContent>
          <TabsContent value="villains">
            {/* mostrar todos los villanos */}
            <HeroGrid heroes={ HeroesResponse?.heroes ?? [] }/>
          </TabsContent>
        </Tabs>


        {/* Character Grid */}
        

        {/* Pagination */}
        {
          selectedTab !== 'favorites' && (
            <CustomPagination totalPages={HeroesResponse?.pages ?? 1}/>
          )
        }
        
      </>
    </>
  )
}
