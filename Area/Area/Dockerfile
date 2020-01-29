# Build WEB

FROM mcr.microsoft.com/dotnet/core/aspnet:3.0 AS base
WORKDIR /app
ENV ASPNETCORE_URLS http://+:8081
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/core/sdk:3.0 AS build
WORKDIR /src
COPY ["Area.csproj", ""]
RUN dotnet restore "./Area.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "Area.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Area.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Area.dll"]