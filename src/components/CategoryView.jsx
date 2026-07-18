import Media from './Media.jsx'

export default function CategoryView({ category, lang }) {
  const label = category.label[lang]
  const intro = category.intro ? category.intro[lang] : null

  return (
    <section className="category-view">
      <header className="category-view__header">
        <h2 className="category-view__title">{label}</h2>
        {intro && <p className="category-view__intro">{intro}</p>}
      </header>

      <div className="category-view__list">
        {category.projects.map((p, i) => {
          const title = p.title ? p.title[lang] || p.title : null
          return (
            <article className={`project project--${p.orientation || 'horizontal'}`} key={i}>
            <Media
              alt={title || p.note || label}
              label={`imagen/video: ${p.note || title || category.id}-${i + 1}`}
              src={p.image}
              poster={p.poster}
              autoPlay={i === 0}
            />
              <p className="project__caption">
                {category.id === 'trabajo-artistico' ? (
                  <span className="project__year">{p.year}</span>
                ) : (
                  <>
                    <span className="project__title">{title}</span>
                    <span className="project__year"> · {p.year}</span>
                     

                     {p.description ? 
                     (
                    
                     <span className="project_description"> 
                     <br />
                     <br />
                     {p.description[lang]}
                     </span>) : ''
                    } 
                    
                  </>
                )}
              </p>
            </article>
          )
        })}
      </div>
    </section>
  )
}