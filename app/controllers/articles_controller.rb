class ArticlesController < ApplicationController
  before_action :set_story, only: [:show]

  def index
    @articles = Article.all
  end

  def show
  end

  def new
    @article = Article.new
  end

  def create
    @article = Article.new(art_params)

    if @article.save
      redirect_to @article, notice: "Article was created successfully"
    else
      render :new
    end
  end

  private
  def art_params
    params.require(:article).permit(:title, :text)
  end

  def set_story
    @article = Article.find(params[:id])
  end
end
